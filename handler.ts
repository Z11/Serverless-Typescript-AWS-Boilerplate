//import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const hello: any = async () => {
  console.log('Hello');
  return true;
};
