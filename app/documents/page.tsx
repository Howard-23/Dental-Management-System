'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Upload,
  Search,
  Download,
  Trash2,
  Folder,
  Image,
  File,
  MoreHorizontal,
} from 'lucide-react';

const documents = [
  { id: 1, name: 'Patient Consent Form 2024.pdf', type: 'pdf', size: '245 KB', date: '2024-02-10', category: 'Forms' },
  { id: 2, name: 'HIPAA Privacy Policy.pdf', type: 'pdf', size: '180 KB', date: '2024-01-15', category: 'Compliance' },
  { id: 3, name: 'Insurance Verification Template.docx', type: 'doc', size: '32 KB', date: '2024-02-01', category: 'Templates' },
  { id: 4, name: 'Treatment Plan - John Smith.pdf', type: 'pdf', size: '1.2 MB', date: '2024-02-12', category: 'Patient Records' },
  { id: 5, name: 'X-Ray - Tooth 19.jpg', type: 'image', size: '3.4 MB', date: '2024-02-11', category: 'Imaging' },
  { id: 6, name: 'Office Protocols 2024.pdf', type: 'pdf', size: '520 KB', date: '2024-01-20', category: 'Procedures' },
];

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Documents</h1>
          <p className="text-slate-500 mt-1">Manage patient files, forms, and office documents</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>
            <Button variant="outline">All Categories</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <div 
                key={doc.id} 
                className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  {doc.type === 'pdf' && <FileText className="w-8 h-8 text-red-500" />}
                  {doc.type === 'doc' && <File className="w-8 h-8 text-blue-500" />}
                  {doc.type === 'image' && <Image className="w-8 h-8 text-purple-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 truncate">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{doc.category}</Badge>
                    <span className="text-xs text-slate-500">{doc.size}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{doc.date}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
