import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import WebLink from '../WebLink'
import CenterView from '../../../../components/CenterView/index'

storiesOf('WebLink/WebLink', module)
    .addDecorator(getStory => <CenterView type='vertical'>{getStory()}</CenterView>)
    .add('general', () => (<WebLink name='Vocaloid Wiki' url='https://vocaloid.wikia.com/wiki/Romeo_and_Cinderella' />));