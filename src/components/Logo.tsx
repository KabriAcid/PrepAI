import React from 'react';

type LogoSize = 'sm' | 'md' | 'lg' | number;
type LogoTheme = 'light' | 'dark';

interface LogoProps {
    size?: LogoSize;
    theme?: LogoTheme;
    className?: string;
    showText?: boolean;
    text?: string;
}

const sizeMap: Record<Exclude<LogoSize, number>, number> = {
    sm: 28,
    md: 40,
    lg: 52,
};

const resolveSize = (size: LogoSize): number =>
    typeof size === 'number' ? size : sizeMap[size];

const Logo: React.FC<LogoProps> = ({
    size = 'md',
    theme = 'dark',
    className = '',
    showText = true,
    text = 'PrepAI',
}) => {
    const px = resolveSize(size);
    const src = theme === 'light' ? '/favicon-light.png' : '/favicon-dark.png';

    return (
        <span className={`inline-flex items-center ${className}`.trim()}>
            <img
                src={src}
                alt={text}
                style={{ height: px, width: showText ? 'auto' : px }}
                className="object-contain"
            />
        </span>
    );
};

export default Logo;