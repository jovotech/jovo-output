import { Equals } from 'jovo-output';
import { Button, ButtonType } from './Button';

export class LogoutButton extends Button<ButtonType.Logout> {
  @Equals(ButtonType.Logout)
  type: ButtonType.Logout;
}
