<!--
 Copyright (c) 2023 Joseph Hale <me@jhale.dev>
 
 This Source Code Form is subject to the terms of the Mozilla Public
 License, v. 2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.
-->

# Migrations

While library migrations should be rare they will sometimes be a
necessity. 

## Rules of Migrations

1. Never import anything from the `library.ts`. Use primitive operations
   instead.
   - By existing, a migration indicates that the contents of
     `library.ts` have changed, making them unreliable.
   - Remember, a user may have a library that is multiple versions out
     of date -- i.e. created with a very old copy of `library.ts`
   - It's prone to creating problematic circular dependencies.
2. Always make a backup prior to changing a file.
   - Users will be much angrier about lost/corrupted data than seeing a
     few extra MB of storage space used.
   - Backups make it easier to rollback too.
3. Always provide a default export of type [`Migration`](./types.ts)
   - Otherwise the migration runner will not work.