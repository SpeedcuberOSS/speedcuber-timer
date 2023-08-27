// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Button, List, Text, useTheme } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Attempt } from '../../../lib/stif/wrappers';
import Icons from '../../icons/iconHelper';
import TwistyPlayer from '../TwistyPlayer';
import formatElapsedTime, {
  getAttemptTimeString,
} from '../../utils/formatElapsedTime';
import { useTranslation } from 'react-i18next';

export interface AttemptDetailsProps {
  attempt: Attempt;
  onReplay?: (attempt: Attempt) => void;
  onPressTPS?: (attempt: Attempt) => void;
}

export default function AttemptDetails({
  attempt,
  onReplay = () => {},
  onPressTPS = undefined,
}: AttemptDetailsProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const Icon =
    attempt.event().type === 'unofficial'
      ? Icons.WCAEventUnofficial
      : Icons.WCAEvent;
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text variant="displayLarge">{getAttemptTimeString(attempt)}</Text>
        <View style={styles.headerSubtitle}>
          {Icon(attempt.event().id)({
            size: 14,
            color: theme.colors.onBackground,
          })}
          <Text>{t(`events.${attempt.event().id}`)}</Text>
          <Text>-</Text>
          <Text>{new Date(attempt.timerStart()).toLocaleString()}</Text>
        </View>
        {attempt.moveCount() > 0 ? (
          <Button
            onPress={() => onReplay(attempt)}
            style={{ marginVertical: 15 }}
            mode="contained"
            icon={Icons.Entypo('controller-play')}>
            {t('attempt.replay')}
          </Button>
        ) : null}
      </View>
      {attempt.comment().length > 0 ? (
        <List.Section>
          <List.Subheader>{t('attempt.comment')}</List.Subheader>
          <List.Item
            title={attempt.comment()}
            titleNumberOfLines={0}
            left={props => (
              <List.Icon
                color={props.color}
                style={[props.style, { alignSelf: 'flex-start' }]}
                icon={Icons.MaterialIcons('comment')}
              />
            )}
          />
        </List.Section>
      ) : null}
      <List.Section>
        <List.Subheader>{t('statistics.statistics')}</List.Subheader>
        <List.Item
          left={props => (
            <List.Icon {...props} icon={Icons.Ionicons('hourglass')} />
          )}
          title={formatElapsedTime(new Date(attempt.inspectionDuration()))}
          description={t('statistics.duration.inspection')}
        />
        <List.Item
          left={props => (
            <List.Icon
              {...props}
              icon={Icons.MaterialCommunityIcons('counter')}
            />
          )}
          title={attempt.moveCount() || t('common.not_available')}
          description={t('statistics.move_count')}
        />
        <List.Item
          left={props => (
            <List.Icon
              {...props}
              icon={Icons.MaterialCommunityIcons('speedometer')}
            />
          )}
          title={attempt.tps()?.toFixed(3) ?? t('common.not_available')}
          description={t('statistics.tps')}
          onPress={
            attempt.tps() && onPressTPS ? () => onPressTPS(attempt) : undefined
          }
          right={props =>
            attempt.tps() &&
            onPressTPS && (
              <List.Icon {...props} icon={Icons.Entypo('chevron-right')} />
            )
          }
        />
      </List.Section>
      <List.Section>
        <List.Subheader>
          {t('attempt.infraction', { count: attempt.infractions().length })}
        </List.Subheader>
        {attempt.infractions().length == 0 ? (
          <List.Item title={t('common.none')} />
        ) : (
          attempt.infractions().map((infraction, index) => (
            // IDEA: - Add a "right arrow" which opens up a description
            // of the infraction (e.g. linking to the WCA regulations)
            <List.Item
              key={index}
              left={props => (
                <List.Icon {...props} icon={Icons.Entypo('flag')} />
              )}
              title={infraction.penalty}
              description={infraction.id}
              titleNumberOfLines={0}
            />
          ))
        )}
      </List.Section>
      <List.Section>
        <List.Subheader>
          {t('puzzle.puzzle', { count: attempt.solutions().length })}
        </List.Subheader>
        {/* @ts-ignore */}
        {attempt.solutions().map((solution, index) => (
          <List.Accordion
            key={index}
            title={solution.scramble().join(' ')}
            titleNumberOfLines={0}
            description={
              solution.duration()
                ? formatElapsedTime(new Date(solution.duration()))
                : ''
            }
            left={props => (
              <List.Icon {...props} icon={Icons.WCAEvent(solution.puzzle())} />
            )}>
            <View style={{ height: 200 }}>
              <TwistyPlayer
                // @ts-ignore
                puzzle={solution.puzzle()}
                algorithm={solution.scramble()}
                visualization={'2D'}
                backgroundColor={theme.colors.background}
              />
            </View>
          </List.Accordion>
        ))}
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: 'center', paddingTop: 18 },
  headerSubtitle: { flexDirection: 'row', gap: 10, alignItems: 'center' },
});
