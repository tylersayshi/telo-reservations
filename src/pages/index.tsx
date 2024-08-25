import g from 'googleapis';
import { TeloTable } from '../components/TeloTable';
import { SearchInput } from '../components/SearchInput';
import { Reservation } from '../types';
import { TableCaption } from '../components/ui/table';

// Note: Only the default export seems to be working
const { google } = g;

const RESERVATION_IND_MAP = new Map<number, keyof Reservation>([
  [0, 'receipt'],
  [1, 'number'],
  [2, 'use'],
  [3, 'date'],
]);

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

  const rows = response.data.values!.slice(1) as [
    string,
    string,
    string,
    string,
  ][];

  const rowsAsReservations = rows.map((row) => {
    const rowAsReservation = {} as Reservation;
    for (const [index, key] of RESERVATION_IND_MAP.entries()) {
      rowAsReservation[key] = row[index]!;
    }
    return rowAsReservation;
  });

  const ids = new Set(rows.map((row) => row[0]!));

  return (
    <div className="flex w-full max-w-[850px] flex-col gap-2">
      <SearchInput ids={ids} />
      <TeloTable rows={rowsAsReservations} />
      <TableCaption>{rows.length} total reservations</TableCaption>
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  };
};
