import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs';
import {mySchema} from './schema';
import {Database} from '@nozbe/watermelondb';
import Note from './Note';

const adapter = new LokiJSAdapter({
  schema: mySchema,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
  onQuotaExceededError: error => {
    console.error('Quota exceeded:', error);
  },
  onSetUpError: error => {
    console.error('Setup error:', error);
  },
  extraIncrementalIDBOptions: {
    onDidOverwrite: () => {
      alert('Another tab may have overwritten local data.');
    },
    onversionchange: () => {
      window.location.reload();
    },
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Note],
  actionsEnabled: true,
});
