# Web Plateform

## Stripe Testing

To be able to test the subscription / payment you need to launch the stripe cli with:

```sh
stripe listen --forward-to localhost:3000/api/webhook/stripe
```
