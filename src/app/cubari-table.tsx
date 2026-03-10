import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const CubariTable = () => {
  const headers: string[] = ["Title", "Author", "Artist", "Source", "Created", "User"]
  const data: string[][] = [
    ["title 1", "author 1", "artist 1", "gist", "today", "me"],
    ["title 2", "author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2 author 2", "artist 2", "mangadex", "yesterday", "you"],
    ["title 3", "author 3", "artist 3", "weebcentral", "tomorrow", "them"],
    ["title 4", "author 4", "artist 4", "gist", "today", "him"],
    ["title 5", "author 5", "artist 5", "mangadex", "yesterday", "her"],
  ]
  return (
    <div className="flex flex-col items-center gap-8">
      <Input placeholder="Search..." className="max-w-xs" />
      <Card>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  )
}

export { CubariTable }
