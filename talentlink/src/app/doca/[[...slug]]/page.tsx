import { Button } from "@/components/ui/button";
import Link from "next/link";

//ednf - expoer default named function

interface Params {
  params: {
    slug: string[];
  };
}

export default function Products({ params }: Params) {
  if (params.slug?.length == 2) {
    return (
      <main className="">
        <h1>
          дока, где первый {params.slug[0]} а второй {params.slug[1]}
        </h1>

        <Link href="/">
          <Button>назад</Button>
        </Link>
      </main>
    );
  } else if (params.slug?.length == 1) {
    return (
      <main className="">
        <h1>дока, где первый {params.slug[0]}</h1>

        <Link href="/">
          <Button>назад</Button>
        </Link>
      </main>
    );
  }
  return (
    <main>
      <h1>базирОванная вода</h1>
    </main>
  );
}
