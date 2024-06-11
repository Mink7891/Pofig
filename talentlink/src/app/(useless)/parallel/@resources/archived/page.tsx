import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function ArchivedResources() {
  return (
    <>
      <div>archivedResources</div>
      <Link href="/parallel">
        <Button>default </Button>
      </Link>
    </>
  );
}
