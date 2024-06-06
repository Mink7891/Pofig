//ednf - expoer default named function

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Resources() {
  return (
    <>
      <h1>Resources</h1>
      <Link href="/parallel/archived">
        <Button>archived </Button>
      </Link>
    </>
  );
}
