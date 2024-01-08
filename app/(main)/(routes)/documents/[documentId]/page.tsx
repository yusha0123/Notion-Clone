"use client";

import CoverImage from "@/components/cover-image";
import Toolbar from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface Props {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentDetailsPage = ({ params }: Props) => {
  const document = useQuery(api.documents.getDocumentById, {
    id: params.documentId,
  });

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Not Found</div>;
  }

  return (
    <div className="pb-40">
      <CoverImage url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar data={document} />
      </div>
    </div>
  );
};

export default DocumentDetailsPage;
