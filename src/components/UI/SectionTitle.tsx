import clsx from 'clsx';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  centered = false,
  light = false,
  className
}) => {
  return (
    <div 
      className={clsx(
        'mb-10',
        centered && 'text-center',
        className
      )}
    >
      <h2 
        className={clsx(
          'font-display font-bold mb-4',
          light ? 'text-white' : 'text-foreground'
        )}
        data-aos="fade-up"
      >
        {title}
      </h2>
      {subtitle && (
        <p 
          className={clsx(
            'text-lg md:text-xl max-w-3xl',
            centered && 'mx-auto',
            light ? 'text-gray-300' : 'text-gray-600'
          )}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;