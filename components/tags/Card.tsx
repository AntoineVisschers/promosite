type CardProps = {
  id: string;
};

export default function Card({ id }: CardProps) {
  return (
    <div className="my-6 rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold">Carte #{id}</h3>
      <p className="text-sm text-gray-600">
        Ceci est un composant Card dynamique.
      </p>
    </div>
  );
}
