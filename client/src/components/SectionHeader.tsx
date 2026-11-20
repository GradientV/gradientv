// the top of a section on the home page: the title on the left, an optional action on the
// right (like a link), and a thin rule under both that runs the full width.
//
// why the rule and the action: a short title like "Packages" alone in the corner of a wide
// section looked like it was missing something. the rule ties it to the content under it and
// the action finishes the row, the same way the contact rows use thin rules
import type { ReactNode } from 'react';

export default function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
    return (
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b border-ink/20 pb-5 md:pb-6">
            <h2 className="display-lg">{title}</h2>
            {action}
        </div>
    );
}
