import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';

declare const Cashfree: any;

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {

  constructor(private http: HttpClient, private zone: NgZone) { }

  // Load Cashfree SDK script dynamically

loadCashfree() {
  const script = document.createElement('script');
  script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
  script.onload = () => this.createOrderAndPay();
  document.body.appendChild(script);
}

createOrderAndPay() {
  this.http.post('https://ysurveillance.com/fourthdm/token', {
    order_id: 'ORDER' + new Date().getTime(),
    order_amount: 560,
    customer_details: {
      customer_name: '',
      customer_id: 'CUST' + new Date().getTime(),
      customer_email: '',
      customer_phone: '',
      customer_panNo: ''
    }
  }).subscribe((res: any) => {
    if (res.payment_session_id) {
      
      Cashfree.checkout({
        payment_session_id: res.payment_session_id,
        redirect: true
      });
    } else {
      console.error("No payment_session_id received");
    }
  });
}

  order = {
    order_id: 'ORDER_' + Date.now(),
    order_amount: '',
    order_currency: 'INR',
    customer_details: {
      customer_id: 'CUST_' + Date.now(),
      customer_name: '',
      customer_email: '',
      customer_phone: ''
    }
  };

  // constructor(private http: HttpClient, private zone: NgZone) { }

  ngOnInit(): void {
   this.loadCashfree();
  }

  // loadCashfreeScript(): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     const scriptId = 'cashfree-sdk';

  //     // Don’t load again if already loaded
  //     if (document.getElementById(scriptId)) return resolve();

  //     const script = document.createElement('script');
  //     script.id = scriptId;
  //     script.onload = () => {
  //       console.log('✅ Cashfree SDK loaded');
  //       resolve();
  //     };
  //     script.onerror = () => {
  //       console.error('❌ Failed to load Cashfree SDK');
  //       reject('Cashfree SDK failed');
  //     };

  //     document.body.appendChild(script);
  //   });
  // }

  // async initiatePayment() {
  //   try {
  //     await this.loadCashfreeScript(); // ✅ Always load SDK before using
  //   } catch (err) {
  //     alert('Cashfree failed to load. Please try again.');
  //     return;
  //   }

  //   if (typeof Cashfree === 'undefined' || typeof Cashfree.checkout !== 'function') {
  //     console.error('❌ Cashfree is not loaded');
  //     alert('Cashfree SDK not loaded properly.');
  //     return;
  //   }

  //   this.order.order_id = 'ORDER_' + Date.now();

  //   this.http.post('https://ysurveillance.com/fourthdm/token', this.order).subscribe({
  //     next: async (res: any) => {
  //       const sessionId = res.payment_session_id;
  //       if (!sessionId) {
  //         alert('❌ No session ID received.');
  //         return;
  //       }

  //       try {
  //         const result = await Cashfree.checkout({
  //           paymentSessionId: sessionId,
  //           mode: 'PROD',
  //           redirectTarget: '_modal'
  //         });

  //         if (result?.paymentDetails?.payment_status === 'SUCCESS') {
  //           // this.sendCertificateEmail();
  //         } else {
  //           alert('Payment not completed.');
  //         }

  //       } catch (err) {
  //         console.error('❌ Checkout error:', err);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('❌ Token generation error:', err);
  //     }
  //   });
  // }

}
