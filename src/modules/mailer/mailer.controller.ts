import { Post, Body, Req, Controller } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { MailerProviders } from './providers/mailer';
import { ValidationPipe } from '../../shared/pipes/validation-pipe';
import { RecoverPasswordDto } from './dto/recover-passwordDto';
import { IResponse } from '../../shared/interfaces/response';

@ApiTags('Recuperación de contraseña')
@Controller()
export class MailerController {}
