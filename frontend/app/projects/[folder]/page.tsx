interface Props {
  params: Promise<{
    folder: string;
  }>;
}

export default async function ProjectPage({
  params,
}: Props) {
  const { folder } = await params;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Project: {folder}</h1>

      <p>
        Folder successfully created and opened.
      </p>
    </div>
  );
}