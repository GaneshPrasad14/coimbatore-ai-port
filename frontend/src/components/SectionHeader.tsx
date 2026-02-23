interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

const SectionHeader = ({ badge, title, description, align = 'center' }: SectionHeaderProps) => {
  return (
    <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 glass-card px-4 py-2 mb-6 ${align === 'center' ? '' : ''}`}>
          <span className="text-sm font-medium text-muted-foreground">{badge}</span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className={`text-muted-foreground text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
