interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-red-800">
      {message}
    </div>
  );
}
