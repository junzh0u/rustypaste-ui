import axios from "axios";

type getListArgs = {
  authToken: string;
  instanceUrl: string;
  signal: AbortSignal | undefined;
}

export async function getList(args: getListArgs): Promise<ListItem[]> {
  const result = await axios.get<ListItemRaw[]>(
    args.instanceUrl + "/list",
    {
      responseType: "json",
      headers: {
        "authorization": args.authToken,
      },
      signal: args.signal,
    },
  );

  return result.data.map(x => ({
    url: args.instanceUrl + "/" + x.file_name,
    fileName: x.file_name,
    fileSize: x.file_size,
    createdAtUtc: parseUtcDate(x.creation_date_utc),
    expiresAtUtc: parseUtcDate(x.expires_at_utc),
  }));
}

// Ensure UTC dates are parsed correctly by appending 'Z' if missing
function parseUtcDate(dateStr: string | null): Date | null {
  if (!dateStr) return null;
  // If the string doesn't end with Z or timezone offset, treat as UTC
  if (!dateStr.endsWith('Z') && !dateStr.match(/[+-]\d{2}:\d{2}$/)) {
    dateStr += 'Z';
  }
  return new Date(dateStr);
}

type ListItemRaw = {
  file_name: string;
  file_size: number;
  creation_date_utc: string | null;
  expires_at_utc: string | null;
}

export type ListItem = {
  url: string;
  fileName: string;
  fileSize: number;
  createdAtUtc: Date | null;
  expiresAtUtc: Date | null;
}
