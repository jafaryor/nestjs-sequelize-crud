import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

/**
 * Auto-validate all our endpoints with dto.
 */
@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new UnprocessableEntityException(
          this.handleError(e.message),
        );
      }
    }
  }

  private handleError(errors) {
    return errors;
  }
}

/**
 * Reference: https://github.com/typestack/class-validator
 */
