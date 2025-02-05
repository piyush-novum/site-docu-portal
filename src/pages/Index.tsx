import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteCard } from "@/components/SiteCard";
import { DocumentCard } from "@/components/DocumentCard";
import { FileList } from "@/components/FileList";
import { ViewToggle } from "@/components/ViewToggle";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

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
type ViewMode = "grid" | "list";

const Index = () => {
  const [view, setView] = useState<View>("sites");
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [sitesViewMode, setSitesViewMode] = useState<ViewMode>("grid");
  const [documentsViewMode, setDocumentsViewMode] = useState<ViewMode>("grid");
  const [filesViewMode, setFilesViewMode] = useState<ViewMode>("list");
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

  const renderSitesList = () => (
    <div className="space-y-4">
      {mockSites.map((site) => (
        <Card key={site.id} className="p-4 hover:shadow-lg cursor-pointer animate-fade-in" onClick={() => handleSiteClick(site.id)}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-xl">{site.name}</h3>
              <p className="text-sm text-muted-foreground">
                {site.documentCount} Document{site.documentCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderDocumentsList = () => (
    <div className="space-y-4">
      {mockDocuments[selectedSite!]?.map((doc) => (
        <Card key={doc.id} className="p-4 hover:shadow-lg animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-xl">{doc.name}</h3>
              <p className="text-sm text-muted-foreground">
                {doc.fileCount} File{doc.fileCount !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 text-sm border rounded-md hover:bg-muted"
                onClick={() => handleDocumentView(doc.id)}
              >
                View Files
              </button>
              <button
                className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                onClick={() => handleDocumentDownload(doc.id)}
              >
                Download All
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <Breadcrumbs items={getBreadcrumbItems()} />
          <ViewToggle
            view={
              view === "sites"
                ? sitesViewMode
                : view === "documents"
                ? documentsViewMode
                : filesViewMode
            }
            onChange={(newMode) => {
              if (view === "sites") setSitesViewMode(newMode);
              else if (view === "documents") setDocumentsViewMode(newMode);
              else setFilesViewMode(newMode);
            }}
          />
        </div>
        
        {view === "sites" && (
          sitesViewMode === "grid" ? (
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
          ) : (
            renderSitesList()
          )
        )}

        {view === "documents" && selectedSite && (
          documentsViewMode === "grid" ? (
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
          ) : (
            renderDocumentsList()
          )
        )}

        {view === "files" && selectedDocument && (
          <FileList
            files={mockFiles[selectedDocument] || []}
            onView={handleFileView}
            onDownload={handleFileDownload}
            className={filesViewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : ""}
          />
        )}
      </div>
    </div>
  );
};

export default Index;