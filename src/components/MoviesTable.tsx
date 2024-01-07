import { getMovies } from "@/firebase/movies";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useQuery } from "@tanstack/react-query";
import { Card } from "./ui/card";

export const MoviesTable = () => {
  const {
    isPending,
    error,
    data: movies,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Card className="w-fit">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Link</TableHead>
            <TableHead>Upvotes</TableHead>
            <TableHead>Downvotes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie.title}>
              <TableCell className="font-medium">{movie.title}</TableCell>
              <TableCell>{movie.link || "no link provided"}</TableCell>
              <TableCell>{movie.upvotes ?? 0}</TableCell>
              <TableCell>{movie.downvotes ?? 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
