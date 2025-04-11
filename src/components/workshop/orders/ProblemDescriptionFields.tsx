
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProblemDescriptionFieldsProps {
  issue: string;
  observations: string;
  onFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ProblemDescriptionFields: React.FC<ProblemDescriptionFieldsProps> = ({
  issue,
  observations,
  onFieldChange
}) => {
  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="issue" className="text-right">
          Problema:
        </Label>
        <Textarea
          id="issue"
          name="issue"
          value={issue}
          onChange={onFieldChange}
          className="col-span-3"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="observations" className="text-right">
          Observaciones:
        </Label>
        <Textarea
          id="observations"
          name="observations"
          value={observations}
          onChange={onFieldChange}
          className="col-span-3"
          rows={3}
        />
      </div>
    </>
  );
};

export default ProblemDescriptionFields;
