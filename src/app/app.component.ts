import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CashfreeService } from './cashfree.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'certificateui';

  // form: FormGroup;
  // message = '';
  // showPopup = false;
  // paymentData: any = {};
  // feedback = '';

  // order = {
  //   order_id: 'ORDER_' + new Date().getTime(),
  //   order_amount: 0,
  //   currency: "INR",
  //   customer_details: {
  //     customer_name: '',
  //     customer_id: '',
  //     customer_email: '',
  //     customer_phone: ''
  //   }
  // };

  // constructor(private fb: FormBuilder, private http: HttpClient, private zone: NgZone, private cashfree: CashfreeService, private router: Router) {
  //   this.form = this.fb.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]]
  //   });
  // }

  // showPopupForm(data: any) {
  //   this.showPopup = true;
  //   this.paymentData = data;
  //   const name = this.order.customer_details.customer_name;
  //   const email = this.order.customer_details.customer_email;

  //   this.form.patchValue({ name, email });
  // }

  // onSubmit() {
  //   if (this.form.valid) {
  //     this.http.post('http://localhost:8000/generate-certificate', this.form.value)
  //       .subscribe({
  //         next: () => {
  //           this.message = 'Certificate sent to your email!';
  //           this.form.reset();
  //         },
  //         error: () => {
  //           this.message = 'Error occurred. Try again.';
  //         }
  //       });
  //   }
  // }

  // submitFeedback() {
  //   console.log("Feedback:", this.feedback);
  //   this.showPopup = false;
  //   this.feedback = '';
  // }

  // isLoading = false;

  // async buyNow() {
  //   this.isLoading = true;

  //   const orderPayload = {
  //     order_amount: 1.0,
  //     order_currency: 'INR',
  //     order_id: 'devstudio_' + Date.now(),
  //     customer_details: {
  //       customer_id: 'devstudio_user',
  //       customer_phone: '8474090589',
  //     },
  //     order_meta: {
  //       return_url:
  //         'https://www.cashfree.com/devstudio/preview/pg/web/popupCheckout?order_id={order_id}',
  //     },
  //   };

  //   try {
  //     // Express server on 3000 which does s2s calls to cashfree
  //     const response: any = await this.http
  //       .post('http://localhost:3000/create-order', orderPayload)
  //       .toPromise();
  //     console.log('[Order Created]', response);
  //     const orderId = orderPayload.order_id;
  //     const cashfree = await this.cashfree.getInstance();
  //     const result = await cashfree.checkout({
  //       paymentSessionId: response.payment_session_id,
  //       redirectTarget: '_modal',
  //     });

  //     this.isLoading = false;

  //     if (result.error) {
  //       console.log('User closed modal or payment error', result.error);
  //       return;
  //     }
  //     // 🔁 Confirm payment after modal closes
  //     console.log('✅ Modal closed, checking payment status...');
  //     const status: any = await this.http
  //       .get(`http://localhost:3000/payment-status/${orderId}`)
  //       .toPromise();
  //     const payment = status[0];
  //     if (
  //       payment &&
  //       payment.payment_status &&
  //       payment.payment_status.toLowerCase() === 'success'
  //     ) {
  //       console.log('🎉 Payment successful');
  //       this.router.navigate(['/success']);
  //     } else {
  //       console.log('❌ Payment not successful');
  //       alert('Payment failed or cancelled.');
  //     }
  //   } catch (err) {
  //     this.isLoading = false;
  //     console.error('Error occurred:', err);
  //     alert('Something went wrong');
  //   }
  // }



}