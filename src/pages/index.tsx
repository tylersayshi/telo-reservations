import g from 'googleapis';
import { TeloTable } from '../components/TeloTable';
import { SearchInput } from '../components/SearchInput';

// Note: Only the default export seems to be working
const { google } = g;

export default async function HomePage() {
  const credentials = JSON.parse(process.env.SECRETS_JSON!);
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    credentials: {
      ...credentials,
      private_key: credentials.private_key.replace(/\\n/g, '\n'),
    },
  });

  const sheets = google.sheets({
    version: 'v4',
    auth,
  });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID!,
    range: 'A:D',
  });

  const headerRow = response.data.values![0]! as [
    string,
    string,
    string,
    string,
  ];
  const rows = response.data.values!.slice(1) as [
    string,
    string,
    string,
    string,
  ][];

  return (
    <div className="mt-2 flex w-[850px] flex-col gap-2">
      <SearchInput />
      <div className="relative mx-1 overflow-y-hidden rounded-lg border-2 border-solid border-black/20 dark:border-white/20">
        <TeloTable rows={rows} headerRow={headerRow} />
      </div>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  };
};
