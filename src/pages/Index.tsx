import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteCard } from "@/components/SiteCard";
import { DocumentCard } from "@/components/DocumentCard";
import { FileList } from "@/components/FileList";
import { useToast } from "@/components/ui/use-toast";

// Mock data - replace with real data later
const mockSites = [
  { id: "1", name: "New York Office", documentCount: 5 },
  { id: "2", name: "London Branch", documentCount: 3 },
  { id: "3", name: "Tokyo HQ", documentCount: 7 },
];

const mockDocuments = {
  "1": [
    { id: "d1", name: "Q1 Reports", fileCount: 3 },
    { id: "d2", name: "Safety Protocols", fileCount: 2 },
    { id: "d3", name: "Employee Handbook", fileCount: 1 },
  ],
};

const mockFiles = {
  "d1": [
    { id: "f1", name: "Financial Summary.pdf", size: "2.4 MB" },
    { id: "f2", name: "Performance Metrics.xlsx", size: "1.8 MB" },
    { id: "f3", name: "Team Updates.docx", size: "956 KB" },
  ],
};

type View = "sites" | "documents" | "files";

const Index = () => {
  const [view, setView] = useState<View>("sites");
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSiteClick = (siteId: string) => {
    setSelectedSite(siteId);
    setView("documents");
  };

  const handleDocumentView = (documentId: string) => {
    setSelectedDocument(documentId);
    setView("files");
  };

  const handleDocumentDownload = (documentId: string) => {
    toast({
      title: "Download Started",
      description: "Your document package is being prepared for download.",
    });
  };

  const handleFileView = (fileId: string) => {
    toast({
      title: "Opening File",
      description: "The file viewer is being prepared.",
    });
  };

  const handleFileDownload = (fileId: string) => {
    toast({
      title: "Download Started",
      description: "Your file is being downloaded.",
    });
  };

  const getBreadcrumbItems = () => {
    const items = [];
    
    if (view === "sites") {
      items.push({ label: "Sites", onClick: () => setView("sites") });
    }
    
    if (view === "documents" && selectedSite) {
      const site = mockSites.find(s => s.id === selectedSite);
      items.push(
        { label: "Sites", onClick: () => setView("sites") },
        { label: site?.name || "", onClick: () => setView("documents") }
      );
    }
    
    if (view === "files" && selectedSite && selectedDocument) {
      const site = mockSites.find(s => s.id === selectedSite);
      const document = mockDocuments[selectedSite]?.find(d => d.id === selectedDocument);
      items.push(
        { label: "Sites", onClick: () => setView("sites") },
        { label: site?.name || "", onClick: () => setView("documents") },
        { label: document?.name || "", onClick: () => setView("files") }
      );
    }
    
    return items;
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        <Breadcrumbs items={getBreadcrumbItems()} />
        
        {view === "sites" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSites.map((site) => (
              <SiteCard
                key={site.id}
                name={site.name}
                documentCount={site.documentCount}
                onClick={() => handleSiteClick(site.id)}
              />
            ))}
          </div>
        )}

        {view === "documents" && selectedSite && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDocuments[selectedSite]?.map((doc) => (
              <DocumentCard
                key={doc.id}
                name={doc.name}
                fileCount={doc.fileCount}
                onView={() => handleDocumentView(doc.id)}
                onDownload={() => handleDocumentDownload(doc.id)}
              />
            ))}
          </div>
        )}

        {view === "files" && selectedDocument && (
          <FileList
            files={mockFiles[selectedDocument] || []}
            onView={handleFileView}
            onDownload={handleFileDownload}
          />
        )}
      </div>
    </div>
  );
};

export default Index;