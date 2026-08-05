import Search from '@material-icons/svg/svg/search/baseline.svg'
import Menu from '@material-icons/svg/svg/menu/baseline.svg'
import Close from '@material-icons/svg/svg/close/baseline.svg'
import ShareOutline from '@material-icons/svg/svg/share/outline.svg'
import BookmarkBorder from '@material-icons/svg/svg/bookmark_border/outline.svg'
import DeleteOutline from '@material-icons/svg/svg/delete_outline/outline.svg'
import Add from '@material-icons/svg/svg/add/baseline.svg'
import ArrowBack from '@material-icons/svg/svg/arrow_back/baseline.svg'
import ArrowForward from '@material-icons/svg/svg/arrow_forward/baseline.svg'
import ExpandMore from '@material-icons/svg/svg/expand_more/baseline.svg'
import KeyboardArrowUp from '@material-icons/svg/svg/keyboard_arrow_up/baseline.svg'
import Bookmark from '@material-icons/svg/svg/bookmark/baseline.svg'
import Print from '@material-icons/svg/svg/print/baseline.svg'
import Check from '@material-icons/svg/svg/check/baseline.svg'
import ArrowDropDown from '@material-icons/svg/svg/arrow_drop_down/baseline.svg'
import Mail from '@material-icons/svg/svg/mail/baseline.svg'
import LocationOn from '@material-icons/svg/svg/location_on/baseline.svg'
import Star from '@material-icons/svg/svg/star/baseline.svg'
import VisibilityOff from '@material-icons/svg/svg/visibility_off/baseline.svg'
import Visibility from '@material-icons/svg/svg/visibility/baseline.svg'
import Logout from '@material-icons/svg/svg/logout/baseline.svg'
import Settings from '@material-icons/svg/svg/settings/baseline.svg'
import Dashboard from '@material-icons/svg/svg/dashboard/baseline.svg'
import Folder from '@material-icons/svg/svg/folder/baseline.svg'
import Work from '@material-icons/svg/svg/work/baseline.svg'
import Camera from '@material-icons/svg/svg/camera/baseline.svg'
import Edit from '@material-icons/svg/svg/edit/baseline.svg'
import PictureAsPdf from '@material-icons/svg/svg/picture_as_pdf/baseline.svg'
import DocIcon from '@material-icons/svg/svg/description/baseline.svg'
import ImageIcon from '@material-icons/svg/svg/image/baseline.svg'
import History from '@material-icons/svg/svg/history/baseline.svg'
import Delete from '@material-icons/svg/svg/delete/baseline.svg'
import OpenInNew from '@material-icons/svg/svg/open_in_new/baseline.svg'
import Schedule from '@material-icons/svg/svg/schedule/baseline.svg'
import Remove from '@material-icons/svg/svg/remove/baseline.svg'
import Toc from '@material-icons/svg/svg/toc/baseline.svg'
import PlayArrow from '@material-icons/svg/svg/play_arrow/baseline.svg'
import Pause from '@material-icons/svg/svg/pause/baseline.svg'
import ErrorIcon from '@material-icons/svg/svg/error/baseline.svg'
import CheckCircle from '@material-icons/svg/svg/check_circle/baseline.svg'
import Cancel from '@material-icons/svg/svg/cancel/baseline.svg'
import Warning from '@material-icons/svg/svg/warning/baseline.svg'
import Info from '@material-icons/svg/svg/info/baseline.svg'
import RadioButtonUnchecked from '@material-icons/svg/svg/radio_button_unchecked/baseline.svg'

/**
 * Ícones Material sourced diretamente do pacote `@material-icons/svg` (mesma
 * fonte já citada em `paths.ts` para os ícones outline). `arrow-right` e
 * `arrow-forward` compartilham o mesmo arquivo (`arrow_forward`) — são o
 * mesmo glifo usado em call sites diferentes, mantidos como duas chaves para
 * não forçar renomeação em 10 lugares.
 */
export const MATERIAL_ICONS = {
	search: Search,
	menu: Menu,
	close: Close,
	share: ShareOutline,
	'bookmark-border': BookmarkBorder,
	'delete-outline': DeleteOutline,
	plus: Add,
	'arrow-left': ArrowBack,
	'arrow-right': ArrowForward,
	'arrow-forward': ArrowForward,
	'chevron-down': ExpandMore,
	'chevron-up': KeyboardArrowUp,
	bookmark: Bookmark,
	print: Print,
	check: Check,
	'arrow-drop-down': ArrowDropDown,
	mail: Mail,
	location: LocationOn,
	star: Star,
	'visibility-off': VisibilityOff,
	visibility: Visibility,
	logout: Logout,
	settings: Settings,
	dashboard: Dashboard,
	folder: Folder,
	'business-center': Work,
	camera: Camera,
	edit: Edit,
	pdf: PictureAsPdf,
	doc: DocIcon,
	image: ImageIcon,
	history: History,
	delete: Delete,
	'open-in-new': OpenInNew,
	schedule: Schedule,
	remove: Remove,
	toc: Toc,
	'play-arrow': PlayArrow,
	pause: Pause,
	error: ErrorIcon,
	'check-circle': CheckCircle,
	cancel: Cancel,
	warning: Warning,
	info: Info,
	'radio-button-unchecked': RadioButtonUnchecked,
} as const

export type PackagedMaterialIconName = keyof typeof MATERIAL_ICONS
