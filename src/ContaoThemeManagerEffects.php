<?php

declare(strict_types=1);

/*
 * This file is part of Contao ThemeManager Recommendation.
 *
 * (c) https://www.oveleon.de/
 */

namespace ContaoThemeManager\Effects;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class ContaoThemeManagerEffects extends Bundle
{
    public function getPath(): string
    {
        return \dirname(__DIR__);
    }
}
