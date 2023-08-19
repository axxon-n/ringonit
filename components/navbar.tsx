import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
	RingIcon
} from "@/components/icons";

import { Logo } from "@/components/icons";

export const Navbar = () => {
	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					K
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						{/*<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEyklEQVR4nO1YzW8bRRQfEDvjNKFpIXGCU6d2nFAQHCouECT4HyiIqg3ckPoXULihSpQDXCK+ioSoUWLROmniJE0iheDujGtEkThCG0AgVaWEpEUkdWLXdp2H3qw3eNfr7NgmEkj7pLnszu/N+828rxlCPPHEE0888cST/4mA0J4CwU6BoDoIdg0E2wDOsiDoDfmNs3eA+wYdsdw3KP9LLL1h4NiGoUfqO4X6/32jgdwHKfoScLYEgoHiuAZJ7Tjo5AHg2vEyWTUsx3Xoi7hu88YLFgZBv6nDcMu49+WeH0rJluWG8Jx+DToLNWG873kQ9FajxpujMLcvU5zf93ODJFbRjsaM5yzvcLz4LQ66dgzS9BAskFa4QvbCZe0JSPleAc4uAmcFOy6X8BeKc+1L8j/Ow/mIWyCtUg/qQ70116yDRNltnHZ+Ai6zvp2wf37adfT6e8HSWqzzZiV2S/dBZvTgveykf3DHtZMsAoJNOp8EC6sFrN3nOSuBoK+7YscI/X04mP/ldBBwLH8cWLe40sWHYSPWuwbfEc1VF6cnjXVtMeEW2DLbVO28u/Eo2QvdH66f7YeVD/rg1zKJ9Zj/W8spRCNw90L3+yr6AElUn8SRnXe/OlVOKC0G5P5MLJy7c3YAcNw+0wcrZ3pu4XcQbMbUl40fgMxIKIff1UiwhM2eq25Fyho8Lj5vSm6i+4RpPI7NeGAL0iwi9eqsHwQros58wi//5yYeeU2JgM76q5KCrh2uQQAroYVtnCjK5liPMI3PfB6B0mLbtE33mIyD2YfknGw8oKvqBs7GbW70Vg0CspxXMj2muggGp0kgP90JWH0tujF1CgbFuf1yzkas9y9lAkIbshFI1mL6o2Viij6qukhmJFyUBKIDsJXcA5gOrbrpgHShmQ7jlEbCBWUCaXrI5tpLNZiyjPUESJsygWjE8P1zvQZ2gbRadGPBEgzuJroMAtEIKBPQSZvNtTPOEzm70ywBNNCRQJo8iN83v+g1Aj0a2VImcIXstZ3A+m64UEH6/0yHgXVwIXQtdDF5AqO74kL0knWiNRBVgrg4v7+M14YsunXfq/mpzu00W1cQp4wE4B7EzaTRuJFGMU2Wd+l85f/SYusMpleTQHYscGkX0qhWXchsruBWyPJTfhNfNLHoipvne7YqC51yIeN0QL2QObcSk8qtxGgoh61CBXYav698cuA2thbbhW40lFVpJUA2lmxauZWQILzKVTdQJ1WbOcxGwH3bWGzmsKnD5g6bPGz2cuPdw0qbIuibDra84M4a21Z7O61AAttpDGZsmyvxf3wUWDNb7JvDwTzekxVseMOhnU4TxQYqVL5A2G9GCWyudsJmxzufxYtL5SnIkzjX8dv1d4Ol1c+6Xlbw+SmHnV+FpO+gEgGXK2XByAraEOj0MVklF0k76NqTmCqBs1m8OuIVsgZ2Vs7D+RJH2oDTx8vX0XGn66i0g/ueUzbeSsLhJBRGcb79J7zMN4IF+843Yvw/JFi4KiYUR+mrlmV8VmnC+HRdbuMSVEcwhakvzr4HoR2VD1v44sBZPUSuumabhsno2mGshFjOy69tmYqnRWxF3oZUy9PO2JZnQLDTxrztp8WM1IP6UG+tIuWJJ5544oknnpD/pvwNmXgms31IIN8AAAAASUVORK5CYII="/>*/}
						
					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
						<TwitterIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.discord} aria-label="Discord">
						<DiscordIcon className="text-default-500" />
					</Link>
					<Link isExternal href="#rsvp" aria-label="Github">
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
				<NavbarItem className="hidden md:flex">
					<Button
            isExternal
						as={Link}
						className="text-sm font-normal text-default-600 bg-default-100"
						href={siteConfig.links.sponsor}
						startContent={<HeartFilledIcon className="text-danger" />}
						variant="flat"
					>
						Sponsor
					</Button>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{searchInput}
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
										? "danger"
										: "foreground"
								}
								href="#rsvp"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
