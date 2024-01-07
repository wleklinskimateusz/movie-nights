import {
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { z } from "zod";

export const Movie = z.object({
  title: z.string(),
  link: z.string().optional(),
  upvotes: z.number().optional(),
  downvotes: z.number().optional(),
  watched: z.boolean().optional(),
});

export type Movie = z.infer<typeof Movie>;

export async function getMovies() {
  const querySnapshot = await getDocs(collection(db, "movies"));
  const response = querySnapshot.docs.map((doc) => doc.data());
  console.log("response", response);
  const validation = Movie.array().safeParse(response);
  if (validation.success) {
    return validation.data;
  } else {
    throw validation.error;
  }
}

export async function addMovie(movie: Movie) {
  console.log("movie", movie);
  try {
    await setDoc(doc(db, "movies", movie.title), movie);
  } catch (e) {
    console.log(e);
  }
}

export async function upvoteMovie(movie: Movie) {
  const movieRef = doc(db, "movies", movie.title);

  await updateDoc(movieRef, {
    upvotes: (movie.upvotes ?? 0) + 1,
  });
}

export async function downvoteMovie({
  title,
  downvotes,
}: Pick<Movie, "title" | "downvotes">) {
  const movieRef = doc(db, "movies", title);

  await updateDoc(movieRef, {
    downvotes: (downvotes ?? 0) + 1,
  });
}

export async function editMovie(movieId: string, movie: Movie) {
  const movieRef = doc(db, "movies", movieId);
  await updateDoc(movieRef, movie);
}

export async function deleteMovie({ title }: Pick<Movie, "title">) {
  await deleteDoc(doc(db, "movies", title));
}

export async function flagMovieWatched({ title }: Pick<Movie, "title">) {
  const movieRef = doc(db, "movies", title);

  await updateDoc(movieRef, {
    watched: true,
  });
}
