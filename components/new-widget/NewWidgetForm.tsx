"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { newWidgetFormSchema, type NewWidgetFormValues } from "@/types";

interface NewWidgetFormProps {
  onSubmit: (values: NewWidgetFormValues) => void;
  isLoading?: boolean;
}

type FieldErrors = Partial<Record<keyof NewWidgetFormValues, string>>;

export function NewWidgetForm({ onSubmit, isLoading = false }: NewWidgetFormProps) {
  const [values, setValues] = useState<NewWidgetFormValues>({
    name: "",
    researchTopic: "",
    researchPrompt: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleChange(field: keyof NewWidgetFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = newWidgetFormSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof NewWidgetFormValues;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    onSubmit(result.data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-sm font-medium text-ink">
          Widget Name
        </Label>
        <Input
          id="name"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="e.g. Q3 AI Tools Research"
          className="border-ink bg-parchment focus-visible:ring-hanse-red"
          disabled={isLoading}
        />
        {errors.name && <p className="text-xs text-hanse-error">{errors.name}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="researchTopic" className="text-sm font-medium text-ink">
          Research Topic
        </Label>
        <Input
          id="researchTopic"
          value={values.researchTopic}
          onChange={(e) => handleChange("researchTopic", e.target.value)}
          placeholder="e.g. AI Coding Assistants"
          className="border-ink bg-parchment focus-visible:ring-hanse-red"
          disabled={isLoading}
        />
        <p className="text-xs text-hanse-muted">
          The product category or niche you want to research.
        </p>
        {errors.researchTopic && (
          <p className="text-xs text-hanse-error">{errors.researchTopic}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="researchPrompt" className="text-sm font-medium text-ink">
          Research Prompt
        </Label>
        <Textarea
          id="researchPrompt"
          value={values.researchPrompt}
          onChange={(e) => handleChange("researchPrompt", e.target.value)}
          placeholder="Describe what you want to learn. What pain points, sentiments, or consumer behaviors are you investigating?"
          className="min-h-32 border-ink bg-parchment focus-visible:ring-hanse-red resize-y"
          disabled={isLoading}
        />
        <p className="text-xs text-hanse-muted">
          Be specific. Mention the user segments, use cases, or questions you care about.
        </p>
        {errors.researchPrompt && (
          <p className="text-xs text-hanse-error">{errors.researchPrompt}</p>
        )}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? "Generating scope..." : "Generate Research Scope"}
        </Button>
      </div>
    </form>
  );
}
