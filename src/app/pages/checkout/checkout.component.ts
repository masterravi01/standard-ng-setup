import { Component, OnInit } from '@angular/core';
import { APIConstant } from '../../core/constants/APIConstant';
import { CrudService } from '../../core/services/crud.service';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  constructor(
    private crudService: CrudService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}
  product = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: {
      rate: 3.9,
      count: 120,
    },
  };
  paymentOrderId = '';
  razorPayKey: any;

  async ngOnInit() {
    console.log('hello');
    this.razorPayKey = environment.razor_key_id;
    await this.add_cdn();
  }
  buyNow() {
    this.crudService
      .post(APIConstant.createPaymentOrder, this.product)
      .then((response: any) => {
        console.log(response);
        this.paymentOrderId = response.data.id;
      })
      .catch((error: any) => {
        console.error('There was an error!', error);
      });
  }

  payWithRazorpay() {
    const paymentOrderId = this.paymentOrderId;
    console.log(this.razorPayKey);
    const options: any = {
      key: this.razorPayKey,
      amount: this.product?.price * 100, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Ravi Limited', // company name or product name
      description: '', // product description
      image:
        'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', // company logo or product image
      order_id: paymentOrderId, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#ddcbff',
      },
    };

    options.handler = (response: any, error: any) => {
      options.response = response;
      if (error) {
        this.router.navigateByUrl('/paymentfailed');
      } else {
        const obj = {
          razorpay_signature: response.razorpay_signature,
          original_order_id: paymentOrderId,
          razorpay_payment_id: response.razorpay_payment_id,
        };
        this.crudService
          .post(APIConstant.validatePayment, obj)
          .then((response: any) => {
            console.log(response);
            response.data.isPaymentVerfied
              ? this.router.navigateByUrl('paymentsuccess')
              : this.router.navigateByUrl('paymentfailed');
          })
          .catch((error: any) => {
            console.error('There was an error!', error);
          });
      }
      // call your backend api to verify payment signature & capture transaction
    };
    options.modal.ondismiss = () => {
      // handle the case when user closes the form while transaction is in progress
      alert('Transaction has been cancelled.');
      this.router.navigateByUrl('');
    };
    const rzp = new this.nativeWindow.Razorpay(options);
    rzp.open();
  }

  get nativeWindow(): any {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
  }

  async add_cdn() {
    // eslint-disable-next-line prefer-const
    let script = window.document.createElement('script');
    script.src = `https://checkout.razorpay.com/v1/checkout.js`;
    window.document.body.appendChild(script);
  }
}

function _window(): any {
  // return the global native browser window object
  return window;
}
