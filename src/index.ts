import { APIGatewayProxyEvent, APIGatewayProxyResultV2, Context } from 'aws-lambda';
import serverlessHttp from 'serverless-http';
import { app } from './app';

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResultV2> => {
    try {
        return await serverlessHttp(app, {
            request: (
                req: { lambdaEvent: APIGatewayProxyEvent; lambdaContext: Context },
                event: APIGatewayProxyEvent,
                context: Context
            ) => {
                req.lambdaEvent = event;
                req.lambdaContext = context;
            }
        })(event, context);
    } catch (e) {
        console.error('error in handler from serverlessHttp: \n' + e);
    }
};
