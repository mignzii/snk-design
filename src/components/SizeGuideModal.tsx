import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SizeGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SizeGuideModal = ({ open, onOpenChange }: SizeGuideModalProps) => {
  const sizeData = [
    { size: "XS", bust: "80-84", waist: "60-64", hips: "86-90" },
    { size: "S", bust: "84-88", waist: "64-68", hips: "90-94" },
    { size: "M", bust: "88-92", waist: "68-72", hips: "94-98" },
    { size: "L", bust: "92-96", waist: "72-76", hips: "98-102" },
    { size: "XL", bust: "96-100", waist: "76-80", hips: "102-106" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-light tracking-wide">Guide des Tailles</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Toutes les mesures sont en centimètres. Pour obtenir vos mesures, utilisez un mètre ruban et mesurez
            directement sur votre corps.
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="uppercase text-xs tracking-wider">Taille</TableHead>
                <TableHead className="uppercase text-xs tracking-wider">Poitrine (cm)</TableHead>
                <TableHead className="uppercase text-xs tracking-wider">Taille (cm)</TableHead>
                <TableHead className="uppercase text-xs tracking-wider">Hanches (cm)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sizeData.map((row) => (
                <TableRow key={row.size}>
                  <TableCell className="font-medium">{row.size}</TableCell>
                  <TableCell>{row.bust}</TableCell>
                  <TableCell>{row.waist}</TableCell>
                  <TableCell>{row.hips}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="space-y-3 text-sm text-muted-foreground">
            <h4 className="font-medium text-foreground text-xs uppercase tracking-wider">Comment mesurer</h4>
            <div className="space-y-2">
              <p><strong>Poitrine:</strong> Mesurez à l'endroit le plus fort de votre poitrine</p>
              <p><strong>Taille:</strong> Mesurez à l'endroit le plus étroit de votre taille naturelle</p>
              <p><strong>Hanches:</strong> Mesurez à l'endroit le plus fort de vos hanches</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
