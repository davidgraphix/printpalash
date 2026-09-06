import { Skeleton } from "@/components/admin/ui/primitives";

/**
 * Shown while a route segment loads. Shapes match the content that follows, so
 * the layout does not jump when it arrives.
 */
export default function AdminLoading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-7 w-52" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-24 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-64 rounded-lg" />
    </div>
  );
}
