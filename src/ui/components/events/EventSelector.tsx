// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import * as Events from '../../../lib/stif/builtins/CompetitiveEvents';

import { Divider, List } from 'react-native-paper';
import { Fragment, useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';

import Icons from '../../icons/iconHelper';
import { STIF } from '../../../lib/stif';
import Ticker from '../ticker/Ticker';
import { useTranslation } from 'react-i18next';

interface EventSelectorProps {
  onSelect: (event: STIF.CompetitiveEvent) => void;
}

interface EventItemProps {
  event: STIF.CompetitiveEvent;
  onSelect: (event: STIF.CompetitiveEvent) => void;
}

function EventItem({ event, onSelect }: EventItemProps) {
  const { t } = useTranslation();
  const [multiCount, setMultiCount] = useState(2);
  const isMultiEvent = () => ['333mbf', "333m", "222m"].includes(event.id)
  const pressHandler = useCallback(() => {
    if (isMultiEvent()) {
      onSelect({ ...event, puzzles: new Array(multiCount).fill(event.puzzles[0]) });
    } else {
      onSelect(event);
    }
  }, [event, onSelect, multiCount]);

  return (
    <List.Item
      title={t(`events.${event.id}`)}
      onPress={pressHandler}
      left={props => <List.Icon {...props} icon={Icons.STIF(`event-${event.id}`)} />}
      right={props =>
        isMultiEvent() ? (
          <View style={{margin: -14}}>
            <Ticker
              initialValue={2}
              min={2}
              step={1}
              onChange={value => setMultiCount(value)}
              orientation="horizontal"
            />
          </View>
        ) : null
      }
    />
  );
}

export default function EventSelector({ onSelect }: EventSelectorProps) {
  const { t } = useTranslation();
  const unsupportedEvents = ['unknown', '333bf-team', '23relay'];
  const events = Object.values(Events).filter(
    e => !unsupportedEvents.includes(e.id),
  );
  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>{t('event.type.official')}</List.Subheader>
        {events
          .filter(e => e.type === 'official')
          .map((e, idx) => (
            // Inspired by: https://www.codemzy.com/blog/joining-arrays-react-components
            <Fragment key={e.id}>
              {!!idx && <Divider horizontalInset />}
              <EventItem key={e.id} event={e} onSelect={onSelect} />
            </Fragment>
          ))}
      </List.Section>
      <List.Section>
        <List.Subheader>{t('event.type.unofficial')}</List.Subheader>
        {events
          .filter(e => e.type === 'unofficial')
          .map((e, idx) => (
            // Inspired by: https://www.codemzy.com/blog/joining-arrays-react-components
            <Fragment key={e.id}>
              {!!idx && <Divider horizontalInset />}
              <EventItem key={e.id} event={e} onSelect={onSelect} />
            </Fragment>
          ))}
      </List.Section>
      <List.Section>
        <List.Subheader>{t('event.type.retired')}</List.Subheader>
        {events
          .filter(e => e.type === 'retired')
          .map((e, idx) => (
            // Inspired by: https://www.codemzy.com/blog/joining-arrays-react-components
            <Fragment key={e.id}>
              {!!idx && <Divider horizontalInset />}
              <EventItem key={e.id} event={e} onSelect={onSelect} />
            </Fragment>
          ))}
      </List.Section>
    </ScrollView>
  );
}
