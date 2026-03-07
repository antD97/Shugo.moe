import "server-only"

import { H1 } from "@/components/ui/header"
import { Link } from "@/components/ui/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function HomePage() {
  const headers: string[] = ["Title", "Author", "Artist", "Source", "Created", "User"]
  const data: string[][] = [
    ["title 1", "author 1", "artist 1", "gist", "today", "me"],
    ["title 2", "author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2", "artist 2", "mangadex", "yesterday", "you"],
    ["title 3", "author 3", "artist 3", "weebcentral", "tomorrow", "them"],
    ["title 4", "author 4", "artist 4", "gist", "today", "him"],
    ["title 5", "author 5", "artist 5", "mangadex", "yesterday", "her"],
  ]

  return (
    <div className="flex flex-col items-center justify-center m-16 gap-16">

      <div className="flex flex-col items-center">
        <H1>
          Shugo
          <span className="text-3xl text-fuchsia-400">.moe</span>
        </H1>
        <p>
          A
          {" "}
          <Link href="https://cubari.moe/">Cubari</Link>
          {" "}
          aggregator.
        </p>
      </div>

      <input
        placeholder="Search..."
        className="bg-white rounded-full text-fuchsia-400 px-3"
      />

      <div className="w-full max-w-5xl bg-card rounded-lg p-4">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map(header => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                {row.map((cell, j) => (
                  <TableCell key={j}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
