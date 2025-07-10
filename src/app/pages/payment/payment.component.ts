import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CashfreeService } from 'src/app/cashfree.service';
import { load } from '@cashfreepayments/cashfree-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  cashfree: any;
  form: FormGroup;
  message = '';
  showPopup = false;
  paymentData: any = {};
  feedback = '';

  order = {
    order_id: 'ORDER_' + new Date().getTime(),
    order_amount: 0,
    currency: "INR",
    customer_details: {
      customer_name: '',
      customer_id: '',
      customer_email: '',
      customer_phone: '',
      customer_panNo: ''
    }
  };

  resetOrderForm() {
    this.order = {
      order_id: 'ORDER_' + new Date().getTime(),
      order_amount: 0,
      currency: "INR",
      customer_details: {
        customer_name: '',
        customer_id: '',
        customer_email: '',
        customer_phone: '',
        customer_panNo: ''
      }
    };
  }

  constructor(private payment: CashfreeService, private _router: Router, private http: HttpClient, private fb: FormBuilder, private zone: NgZone) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      panNo: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.cashfree = await load();
  }

  async initiatePayment() {
    const cashfree = await load(); // Load SDK

    this.http.post('http://localhost:8000/token', this.order).subscribe({
      next: (res: any) => {
        const paymentSessionId = res.payment_session_id;

        //  Don't use `await` here!
        const checkoutPromise = cashfree.checkout({
          paymentSessionId: paymentSessionId,
          redirectTarget: '_modal', // Or '_self' for full-page
          mode: 'TEST'
        });

        //  Use .then() — it's a proper Promise
        checkoutPromise.then((result: any) => {
          if (result.error) {
            console.error('Payment Error:', result.error);
          } else if (result.paymentDetails) {
            console.log('Payment Success:', result.paymentDetails);

            const name = this.order.customer_details.customer_name;
            const email = this.order.customer_details.customer_email;
            const panNo = this.order.customer_details.customer_panNo;
            console.log("Sending cert data:", { name, email, panNo });
            //  Automatically send certificate
            this.http.post('http://localhost:8000/generate-certificate', { name, email, panNo })
              .subscribe({
                next: (response: any) => {
                  console.log('Certificate sent successfully', response);
                  this.message = 'Certificate sent to your email!';
                  alert('Certificate sent to your email!'); // Optional: alert user
                },
                error: (err) => {
                  console.error('Error sending certificate:', err);
                  this.message = 'Error sending certificate. Please try again.';
                  alert(this.message); // Optional: alert user
                }
              });
            //  Update UI
            this.zone.run(() => {
              this.showPopupForm(result.paymentDetails);
              this.resetOrderForm(); // Optional: reset the payment form
            });
          }
        }).catch((error: any) => {
          console.error('Error during checkout:', error);
        });
      },
      error: (err) => {
        console.error("Payment session error", err);
      }
    });
  }
  showPopupForm(data: any) {
    this.showPopup = true;
    this.paymentData = data;
    const name = this.order.customer_details.customer_name;
    const email = this.order.customer_details.customer_email;
    const panNo = this.order.customer_details.customer_panNo;
    this.form.patchValue({ name, email, panNo }); // Populate form with customer details
  }
  // resetOrderForm() {
  //   this.order = {
  //     order_id: 'ORDER_' + new Date().getTime(),
  //     order_amount: 0,
  //     currency: "INR",
  //     customer_details: {
  //       customer_name: '',
  //       customer_id: '',
  //       customer_email: '',
  //       customer_phone: ''
  //     }
  //   };
  // }

  // async initiatePayment() {
  //   const cashfree = await load();
  //   this.http.post('http://localhost:8000/token', this.order).subscribe({
  //     next: (res: any) => {
  //       const paymentSessionId = res.payment_session_id;
  //       const checkout = cashfree.checkout({
  //         paymentSessionId,
  //         redirectTarget: '_modal',
  //         mode: 'TEST',
  //       });

  //       checkout.on('payment.success', (data: any) => {
  //         console.log('Payment Success:', data);
  //         const name = this.order.customer_details.customer_name;
  //         const email = this.order.customer_details.customer_email;

  //         this.http.post('http://localhost:8000/generate-certificate', { name, email })
  //           .subscribe({
  //             next: (response: any) => {
  //               console.log('Certificate sent successfully', response);
  //               this.message = 'Certificate sent to your email!';
  //             },
  //             error: (err) => {
  //               console.error('Error sending certificate:', err);
  //               this.message = 'Error sending certificate. Please try again.';
  //             }
  //           });

  //         this.zone.run(() => {
  //           this.showPopupForm(data);
  //         });
  //       });

  //       checkout.on('payment.failed', (data: any) => {
  //         console.error('Payment Failed', data);
  //       });
  //     },
  //     error: (err) => {
  //       console.error("Payment session error", err);
  //     }
  //   });
  // }


  // async initiatePayment() {
  //   const cashfree = await load(); // Load Cashfree SDK (v3+)
  //   this.http.post('http://localhost:8000/token', this.order).subscribe({
  //     next: async (res: any) => {
  //       const paymentSessionId = res.payment_session_id;

  //       const checkout = cashfree.checkout({
  //         paymentSessionId: paymentSessionId, // Must be payment_session_id!
  //         redirectTarget: '_modal', // Use '_modal' for modal view
  //         mode: 'TEST', // or 'PROD'
  //       });
  //       checkout.then((result: any) => {
  //         if (result.error) {
  //           console.error('Payment Error:', result.error);
  //         } else if (result.paymentDetails) {
  //           console.log('Payment Success:', result.paymentDetails);
  //           const name = this.order.customer_details.customer_name;
  //           const email = this.order.customer_details.customer_email;

  //           // Directly call the certificate generation API
  //           this.http.post('http://localhost:8000/generate-certificate', { name, email })
  //             .subscribe({
  //               next: (response: any) => {
  //                 console.log('Certificate sent successfully', response);
  //                 this.message = 'Certificate sent to your email!';
  //               },
  //               error: (err) => {
  //                 console.error('Error sending certificate:', err);
  //                 this.message = 'Error sending certificate. Please try again.';
  //               }
  //             });

  //           this.zone.run(() => {
  //             this.showPopupForm(result.paymentDetails);
  //           });
  //         }
  //       }).catch((error: any) => {
  //         console.error('Error during checkout:', error);
  //       });
  //       // Optional: Handle event callbacks
  //       // checkout.on('payment.success', (data: any) => {
  //       //   console.log('Payment Success', data);
  //       //   this.zone.run(() => {
  //       //     this.showPopupForm(data);
  //       //   });
  //       // });
  //       // checkout.on('payment.failed', (data: any) => {
  //       //   console.error('Payment Failed', data);
  //       // });
  //     },
  //     error: (err) => {
  //       console.error("Payment session error", err);
  //     }
  //   });
  // }

  // showPopupForm(data: any) {
  //   this.showPopup = true;
  //   this.paymentData = data;
  //   const name = this.order.customer_details.customer_name;
  //   const email = this.order.customer_details.customer_email;
  //   const panNo = this.order.customer_details.customer_panNo;
  //   this.form.patchValue({ name, email, panNo }); // Populate form with customer details
  // }

  // onSubmit() {
  //   if (this.form.valid) {
  //     console.log("Sending certificate data:", this.form.value); // Debug log
  //     this.http.post('http://localhost:8000/generate-certificate', this.form.value)
  //       .subscribe({
  //         next: () => {
  //           this.message = 'Certificate sent to your email!';
  //           this.form.reset();
  //           this.resetOrderForm(); // Add this
  //         },
  //         error: (err) => {
  //           console.error("Certificate error:", err); // Debug log
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

}

// onSubmit() {
//   if (this.form.valid) {
//     this.http.post('http://localhost:8000/generate-certificate', this.form.value)
//       .subscribe({
//         next: () => {
//           this.message = 'Certificate sent to your email!';
//           this.form.reset();
//           this.resetOrderForm();
//         },
//         error: () => {
//           this.message = 'Error occurred. Try again.';
//         }
//       });
//   }
// }

// async ngOnInit() {
//   this.cashfree = await load({ mode: 'sandbox' })
// }

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