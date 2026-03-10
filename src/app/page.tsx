import "server-only"

import { CubariTable } from "@/app/cubari-table"
import { H1 } from "@/components/ui/header"
import { Link } from "@/components/ui/link"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center m-16 gap-16">
      <div className="flex flex-col items-center">
        <H1>
          Shugo
          <span className="text-3xl text-primary-text">.moe</span>
        </H1>
        <p>
          A
          {" "}
          <Link href="https://cubari.moe/">Cubari</Link>
          {" "}
          aggregator.
        </p>
      </div>

      <CubariTable />
    </div>
  )
}
