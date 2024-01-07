import { getMovies, type Movie } from "@/firebase/movies";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";

export const MoviesTable = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  getMovies().then((movies) => {
    setMovies(movies);
  });
  console.log(movies);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies.map((movie) => (
          <TableRow key={movie.title}>
            <TableCell className="font-medium">{movie.title}</TableCell>
            <TableCell>{movie.link}</TableCell>
            <TableCell>{movie.upvotes}</TableCell>
            <TableCell className="text-right">{movie.downvotes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
