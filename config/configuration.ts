import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), './.env'),
});

export default {
  port: parseInt(process.env.PORT, 10),
  secret: process.env.SECRET,
  expiresIn: '48hrs',
  stripeKey: process.env.STRIPE_SECRET_KEY,
  webhookEndpointSecretKey: process.env.WEBHOOK_ENDPOINT_KEY,
  awsApiKey: process.env.AWS_API_KEY,
  awsSecretKey: process.env.AWS_SECRET_KEY,
  awsRegion: process.env.AWS_REGION,
  clientEmail: process.env.CLIENT_EMAIL,
};
