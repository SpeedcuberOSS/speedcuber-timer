<!--
 Copyright (c) 2023 Joseph Hale <me@jhale.dev>
 
 This Source Code Form is subject to the terms of the Mozilla Public
 License, v. 2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->

# Speedcuber Timer's Navigation Strategy

```
Main Navigator
 `-- RootDrawerNavigator
      `-- PracticeNavigator (Stack.Navigator)
           `-- TimerNavigator (Tab.Navigator)
                `-- StopwatchScreen
                `-- AttemptsScreen
                `-- InsightsScreen
           `-- AttemptPlayerScreen
      `-- LearnScreen
      `-- PlayScreen
      `-- ExamplesNavigator (Stack.Navigator)
```