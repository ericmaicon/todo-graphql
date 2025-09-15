import crypto from 'crypto';
import pino from 'pino';

import AppError from '@/error/AppError';

const logger = pino({
  level: 'info',
});

export const loggerPlugin = {
  async requestDidStart() {
    const requestId = crypto.randomUUID();

    logger.info({
      name: 'request_started',
      requestId,
    });

    return {
      async didEncounterErrors(ctx) {
        if (!ctx.operation) {
          return;
        }

        for (const err of ctx.errors) {
          if (err instanceof AppError) {
            logger.info({
              name: 'user_error',
              error: err,
              query: ctx.request.query,
              variables: ctx.request.variables,
              requestId,
            });
            continue;
          }

          logger.info({
            name: 'error',
            error: err,
            query: ctx.request.query,
            variables: ctx.request.variables,
            requestId,
          });
        }
      },
      async willSendResponse(ctx) {
        logger.info({
          name: 'request_finished',
          query: ctx.request.query,
          variables: ctx.request.variables,
          requestId,
        });
      },
    };
  },
};

export default loggerPlugin;
