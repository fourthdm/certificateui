import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CashfreeService {


  // constructor(private http: HttpClient) { }
  // cashfree: any;
  // url = `http://localhost:3000`;

  // async initiatePayment(paymentSessionId: string) {
  //   this.cashfree.checkout({
  //     paymentSessionId: paymentSessionId,
  //     redirectTarget: '_modal' // Opens checkout as a modal popup
  //   }).then((data: any) => {
  //     if (data.paymentDetails) {
  //       console.log('Payment successful:', data.paymentDetails);
  //     } else if (data.error) {
  //       console.error('Payment error:', data.error);
  //     }
  //   });
  // }

  // createOrder(orderDetails: any) {
  //   this.http.post('http://localhost:3000/create-order', orderDetails).subscribe((response: any) => {
  //     this.initiatePayment(response.payment_session_id);
  //   });
  // }
  // private sdkLoaded = false;

  // loadSDK(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     if (this.sdkLoaded) {
  //       return resolve((window as any).Cashfree);
  //     }

  //     const script = document.createElement('script');
  //     script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
  //     script.onload = () => {
  //       this.sdkLoaded = true;
  //       resolve((window as any).Cashfree);
  //     };
  //     script.onerror = reject;

  //     document.body.appendChild(script);
  //   });
  // }

  // async getInstance(): Promise<any> {
  //   const Cashfree = await this.loadSDK();
  //   return Cashfree({ mode: 'production' });
  // }


}
