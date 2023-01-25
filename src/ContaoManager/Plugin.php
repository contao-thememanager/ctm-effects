<?php

declare(strict_types=1);

/*
 * This file is part of Contao ThemeManager Effects.
 *
 * (c) https://www.oveleon.de/
 */

namespace ContaoThemeManager\Effects\ContaoManager;

use Contao\CoreBundle\ContaoCoreBundle;
use Contao\ManagerPlugin\Bundle\BundlePluginInterface;
use Contao\ManagerPlugin\Bundle\Config\BundleConfig;
use Contao\ManagerPlugin\Bundle\Parser\ParserInterface;
use ContaoThemeManager\Effects\ContaoThemeManagerEffects;
use ContaoThemeManager\Core\ContaoThemeManagerCore;

class Plugin implements BundlePluginInterface
{
    /**
     * {@inheritdoc}
     */
    public function getBundles(ParserInterface $parser): array
    {
        return [
            BundleConfig::create(ContaoThemeManagerEffects::class)
                ->setLoadAfter([ContaoCoreBundle::class, ContaoThemeManagerCore::class])
                ->setReplace(['ctm-recommendation']),
        ];
    }
}
