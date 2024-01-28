import './normalize.css';
import './style.css';

import { getCurrentWeatherByIp } from './modules/functions';
import { formSubmitEventControl, addEventListenerToRadioBtn } from './modules/event-handlers';

getCurrentWeatherByIp();
formSubmitEventControl();
addEventListenerToRadioBtn();