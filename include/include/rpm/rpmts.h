#ifndef H_RPMTS
#define H_RPMTS

/** \ingroup rpmts
 * \file lib/rpmts.h
 * Structures and prototypes used for an "rpmts" transaction set.
 */

#include <sys/types.h>

#include <rpm/rpmtypes.h>
#include <rpm/rpmps.h>
#include <rpm/rpmsw.h>
#include <rpm/rpmpgp.h>
#include <rpm/rpmfi.h>
#include <rpm/rpmcallback.h>

#ifdef __cplusplus
extern "C" {
#endif

extern int _rpmts_debug;
extern int _rpmts_stats;

/** \ingroup rpmts
 * Bit(s) to control rpmtsRun() operation.
 */
typedef enum rpmtransFlags_e {
    RPMTRANS_FLAG_NONE		= 0,
    RPMTRANS_FLAG_TEST		= (1 <<  0),	/*!< from --test */
    RPMTRANS_FLAG_BUILD_PROBS	= (1 <<  1),	/*!< don't process payload */
    RPMTRANS_FLAG_NOSCRIPTS	= (1 <<  2),	/*!< from --noscripts */
    RPMTRANS_FLAG_JUSTDB	= (1 <<  3),	/*!< from --justdb */
    RPMTRANS_FLAG_NOTRIGGERS	= (1 <<  4),	/*!< from --notriggers */
    RPMTRANS_FLAG_NODOCS	= (1 <<  5),	/*!< from --excludedocs */
    RPMTRANS_FLAG_ALLFILES	= (1 <<  6),	/*!< from --allfiles */
    RPMTRANS_FLAG_KEEPOBSOLETE	= (1 <<  7),	/*!< @todo Document. */
    RPMTRANS_FLAG_NOCONTEXTS	= (1 <<  8),	/*!< from --nocontexts */
    RPMTRANS_FLAG_DIRSTASH	= (1 <<  9),	/*!< obsolete, unused */
    RPMTRANS_FLAG_REPACKAGE	= (1 << 10),	/*!< obsolete, unused */

    RPMTRANS_FLAG_PKGCOMMIT	= (1 << 11),
    RPMTRANS_FLAG_PKGUNDO	= (1 << 12),
    RPMTRANS_FLAG_COMMIT	= (1 << 13),
    RPMTRANS_FLAG_UNDO		= (1 << 14),
    RPMTRANS_FLAG_REVERSE	= (1 << 15),

    RPMTRANS_FLAG_NOTRIGGERPREIN= (1 << 16),	/*!< from --notriggerprein */
    RPMTRANS_FLAG_NOPRE		= (1 << 17),	/*!< from --nopre */
    RPMTRANS_FLAG_NOPOST	= (1 << 18),	/*!< from --nopost */
    RPMTRANS_FLAG_NOTRIGGERIN	= (1 << 19),	/*!< from --notriggerin */
    RPMTRANS_FLAG_NOTRIGGERUN	= (1 << 20),	/*!< from --notriggerun */
    RPMTRANS_FLAG_NOPREUN	= (1 << 21),	/*!< from --nopreun */
    RPMTRANS_FLAG_NOPOSTUN	= (1 << 22),	/*!< from --nopostun */
    RPMTRANS_FLAG_NOTRIGGERPOSTUN = (1 << 23),	/*!< from --notriggerpostun */
    RPMTRANS_FLAG_NOPAYLOAD	= (1 << 24),
    RPMTRANS_FLAG_APPLYONLY	= (1 << 25),

    RPMTRANS_FLAG_NOMD5		= (1 << 27),	/*!< from --nomd5 */
    RPMTRANS_FLAG_NOFILEDIGEST	= (1 << 27),	/*!< from --nofiledigest (alias to --nomd5) */
    RPMTRANS_FLAG_NOSUGGEST	= (1 << 28),	/*!< from --nosuggest */
    RPMTRANS_FLAG_ADDINDEPS	= (1 << 29),	/*!< from --aid */
    RPMTRANS_FLAG_NOCONFIGS	= (1 << 30),	/*!< from --noconfigs */
    RPMTRANS_FLAG_DEPLOOPS	= (1 << 31)	/*!< from --deploops */
} rpmtransFlags;

#define	_noTransScripts		\
  ( RPMTRANS_FLAG_NOPRE |	\
    RPMTRANS_FLAG_NOPOST |	\
    RPMTRANS_FLAG_NOPREUN |	\
    RPMTRANS_FLAG_NOPOSTUN	\
  )

#define	_noTransTriggers	\
  ( RPMTRANS_FLAG_NOTRIGGERPREIN | \
    RPMTRANS_FLAG_NOTRIGGERIN |	\
    RPMTRANS_FLAG_NOTRIGGERUN |	\
    RPMTRANS_FLAG_NOTRIGGERPOSTUN \
  )

/** \ingroup rpmts
 * Bit(s) to control digest and signature verification.
 */
typedef enum rpmVSFlags_e {
    RPMVSF_DEFAULT	= 0,
    RPMVSF_NOHDRCHK	= (1 <<  0),
    RPMVSF_NEEDPAYLOAD	= (1 <<  1),
    /* bit(s) 2-7 unused */
    RPMVSF_NOSHA1HEADER	= (1 <<  8),
    RPMVSF_NOMD5HEADER	= (1 <<  9),	/* unimplemented */
    RPMVSF_NODSAHEADER	= (1 << 10),
    RPMVSF_NORSAHEADER	= (1 << 11),	/* unimplemented */
    /* bit(s) 12-15 unused */
    RPMVSF_NOSHA1	= (1 << 16),	/* unimplemented */
    RPMVSF_NOMD5	= (1 << 17),
    RPMVSF_NODSA	= (1 << 18),
    RPMVSF_NORSA	= (1 << 19)
    /* bit(s) 16-31 unused */
} rpmVSFlags;

#define	_RPMVSF_NODIGESTS	\
  ( RPMVSF_NOSHA1HEADER |	\
    RPMVSF_NOMD5HEADER |	\
    RPMVSF_NOSHA1 |		\
    RPMVSF_NOMD5 )

#define	_RPMVSF_NOSIGNATURES	\
  ( RPMVSF_NODSAHEADER |	\
    RPMVSF_NORSAHEADER |	\
    RPMVSF_NODSA |		\
    RPMVSF_NORSA )

#define	_RPMVSF_NOHEADER	\
  ( RPMVSF_NOSHA1HEADER |	\
    RPMVSF_NOMD5HEADER |	\
    RPMVSF_NODSAHEADER |	\
    RPMVSF_NORSAHEADER )

#define	_RPMVSF_NOPAYLOAD	\
  ( RPMVSF_NOSHA1 |		\
    RPMVSF_NOMD5 |		\
    RPMVSF_NODSA |		\
    RPMVSF_NORSA )

/** \ingroup rpmts
 * Indices for timestamps.
 */
typedef	enum rpmtsOpX_e {
    RPMTS_OP_TOTAL		=  0,
    RPMTS_OP_CHECK		=  1,
    RPMTS_OP_ORDER		=  2,
    RPMTS_OP_FINGERPRINT	=  3,
    RPMTS_OP_INSTALL		=  5,
    RPMTS_OP_ERASE		=  6,
    RPMTS_OP_SCRIPTLETS		=  7,
    RPMTS_OP_COMPRESS		=  8,
    RPMTS_OP_UNCOMPRESS		=  9,
    RPMTS_OP_DIGEST		= 10,
    RPMTS_OP_SIGNATURE		= 11,
    RPMTS_OP_DBADD		= 12,
    RPMTS_OP_DBREMOVE		= 13,
    RPMTS_OP_DBGET		= 14,
    RPMTS_OP_DBPUT		= 15,
    RPMTS_OP_DBDEL		= 16,
    RPMTS_OP_MAX		= 17
} rpmtsOpX;

/** \ingroup rpmts
 * Perform dependency resolution on the transaction set.
 *
 * Any problems found by rpmtsCheck() can be examined by retrieving the 
 * problem set with rpmtsProblems(), success here only means that
 * the resolution was successfully attempted for all packages in the set.
 *
 * @param ts		transaction set
 * @return		0 on success
 */
int rpmtsCheck(rpmts ts);

/** \ingroup rpmts
 * Determine package order in a transaction set according to dependencies.
 *
 * Order packages, returning error if circular dependencies cannot be
 * eliminated by removing Requires's from the loop(s). Only dependencies from
 * added or removed packages are used to determine ordering using a
 * topological sort (Knuth vol. 1, p. 262). Use rpmtsCheck() to verify
 * that all dependencies can be resolved.
 *
 * The final order ends up as installed packages followed by removed packages,
 * with packages removed for upgrades immediately following the new package
 * to be installed.
 *
 * @param ts		transaction set
 * @return		no. of (added) packages that could not be ordered
 */
int rpmtsOrder(rpmts ts);

/** \ingroup rpmts
 * Process all package elements in a transaction set.  Before calling
 * rpmtsRun be sure to have:
 *
 *    - setup the rpm root dir via rpmtsSetRoot().
 *    - setup the rpm notify callback via rpmtsSetNotifyCallback().
 *    - setup the rpm transaction flags via rpmtsSetFlags().
 * 
 * Additionally, though not required you may want to:
 *
 *    - setup the rpm verify signature flags via rpmtsSetVSFlags().
 *       
 * @param ts		transaction set
 * @param okProbs	previously known problems (or NULL)
 * @param ignoreSet	bits to filter problem types
 * @return		0 on success, -1 on error, >0 with newProbs set
 */
int rpmtsRun(rpmts ts, rpmps okProbs, rpmprobFilterFlags ignoreSet);

/** \ingroup rpmts
 * Unreference a transaction instance.
 * @param ts		transaction set
 * @param msg
 * @return		NULL always
 */
rpmts rpmtsUnlink (rpmts ts,
		const char * msg);

/** \ingroup rpmts
 * Reference a transaction set instance.
 * @param ts		transaction set
 * @param msg
 * @return		new transaction set reference
 */
rpmts rpmtsLink (rpmts ts, const char * msg);

/** \ingroup rpmts
 * Close the database used by the transaction.
 * @param ts		transaction set
 * @return		0 on success
 */
int rpmtsCloseDB(rpmts ts);

/** \ingroup rpmts
 * Open the database used by the transaction.
 * @param ts		transaction set
 * @param dbmode	O_RDONLY or O_RDWR
 * @return		0 on success
 */
int rpmtsOpenDB(rpmts ts, int dbmode);

/** \ingroup rpmts
 * Initialize the database used by the transaction.
 * @deprecated An explicit rpmdbInit() is almost never needed.
 * @param ts		transaction set
 * @param dbmode	O_RDONLY or O_RDWR
 * @return		0 on success
 */
int rpmtsInitDB(rpmts ts, int dbmode);

/** \ingroup rpmts
 * Return the transaction database mode
 * @param ts		transaction set
 * @return		O_RDONLY, O_RDWR or -1 (lazy opens disabled)
 */
int rpmtsGetDBMode(rpmts ts);

/** \ingroup rpmts
 * Set the transaction database mode. Only permitted when when backing
 * database hasn't been opened yet (ie rpmtsGetRdb(ts) == NULL)
 * @param ts		transaction set
 * @param dbmode	O_RDONLY, O_RDWR or -1 (disable lazy opens)
 * @return		0 on success, 1 on error 
 */
int rpmtsSetDBMode(rpmts ts, int dbmode);

/** \ingroup rpmts
 * Rebuild the database used by the transaction.
 * @param ts		transaction set
 * @return		0 on success
 */
int rpmtsRebuildDB(rpmts ts);

/** \ingroup rpmts
 * Verify the database used by the transaction.
 * @param ts		transaction set
 * @return		0 on success
 */
int rpmtsVerifyDB(rpmts ts);

/** \ingroup rpmts
 * Return transaction database iterator.
 * @param ts		transaction set
 * @param rpmtag	rpm tag
 * @param keyp		key data (NULL for sequential access)
 * @param keylen	key data length (0 will use strlen(keyp))
 * @return		NULL on failure
 */
rpmdbMatchIterator rpmtsInitIterator(const rpmts ts, rpmTag rpmtag,
			const void * keyp, size_t keylen);

/** \ingroup rpmts
 * Retrieve pubkey from rpm database.
 * @param ts		rpm transaction
 * @param dig		OpenPGP packet container
 * @return		RPMRC_OK on success, RPMRC_NOKEY if not found
 */
rpmRC rpmtsFindPubkey(rpmts ts, pgpDig dig) RPM_GNUC_DEPRECATED;

/** \ingroup rpmts
 * Import public key packet(s).
 * @todo Implicit --update policy for gpg-pubkey headers.
 * @param ts            transaction set
 * @param pkt           pgp pubkey packet(s)
 * @param pktlen        pgp pubkey length
 * @return              RPMRC_OK/RPMRC_FAIL
 */
rpmRC rpmtsImportPubkey(rpmts ts, const unsigned char * pkt, size_t pktlen);

/** \ingroup rpmts
 * Retrieve handle for keyring used for this transaction set
 * @param ts            transaction set
 * @param autoload	load default keyring if keyring is not set
 * @return              keyring handle (or NULL)
 */
rpmKeyring rpmtsGetKeyring(rpmts ts, int autoload);

/** \ingroup rpmts
 * Set keyring to use for this transaction set.
 * Keyring can be only changed while the underlying rpm database is not
 * yet open.
 * @param ts            transaction set
 * @param keyring	keyring handle (NULL to free current keyring)
 * @return              0 on success, -1 on error
 */
int rpmtsSetKeyring(rpmts ts, rpmKeyring keyring);

/** \ingroup rpmts
 * Set dependency solver callback.
 * @param ts		transaction set
 * @param (*solve)	dependency solver callback
 * @param solveData	dependency solver callback data (opaque)
 * @return		0 on success
 */
int rpmtsSetSolveCallback(rpmts ts,
		int (*solve) (rpmts ts, rpmds ds, const void * data),
		const void * solveData);

/** \ingroup rpmts
 * Return current transaction set problems.
 * @param ts		transaction set
 * @return		current problem set (or NULL)
 */
rpmps rpmtsProblems(rpmts ts);

/** \ingroup rpmts
 * Clean current transaction problem set.
 * @param ts		transaction set
 */
void rpmtsCleanProblems(rpmts ts);

/** \ingroup rpmts
 * Free memory needed only for dependency checks and ordering.
 * @param ts		transaction set
 */
void rpmtsClean(rpmts ts);

/** \ingroup rpmts
 * Re-create an empty transaction set.
 * @param ts		transaction set
 */
void rpmtsEmpty(rpmts ts);

/** \ingroup rpmts
 * Destroy transaction set, closing the database as well.
 * @param ts		transaction set
 * @return		NULL always
 */
rpmts rpmtsFree(rpmts ts);

/** \ingroup rpmts
 * Get verify signatures flag(s).
 * @param ts		transaction set
 * @return		verify signatures flags
 */
rpmVSFlags rpmtsVSFlags(rpmts ts);

/** \ingroup rpmts
 * Set verify signatures flag(s).
 * @param ts		transaction set
 * @param vsflags	new verify signatures flags
 * @return		previous value
 */
rpmVSFlags rpmtsSetVSFlags(rpmts ts, rpmVSFlags vsflags);

/** \ingroup rpmts
 * Set index of 1st element of successors.
 * @param ts		transaction set
 * @param first		new index of 1st element of successors
 * @return		previous value
 */
int rpmtsUnorderedSuccessors(rpmts ts, int first);

/** \ingroup rpmts
 * Get transaction rootDir, i.e. path to chroot(2).
 * @param ts		transaction set
 * @return		transaction rootDir
 */
const char * rpmtsRootDir(rpmts ts);

/** \ingroup rpmts
 * Set transaction rootDir, i.e. path to chroot(2).
 * @param ts		transaction set
 * @param rootDir	new transaction rootDir (or NULL)
 * @return		0 on success, -1 on error (invalid rootDir)
 */
int rpmtsSetRootDir(rpmts ts, const char * rootDir);

/** \ingroup rpmts
 * Get transaction currDir, i.e. current directory before chroot(2).
 * @param ts		transaction set
 * @return		transaction currDir
 */
const char * rpmtsCurrDir(rpmts ts);

/** \ingroup rpmts
 * Set transaction currDir, i.e. current directory before chroot(2).
 * @param ts		transaction set
 * @param currDir	new transaction currDir (or NULL)
 */
void rpmtsSetCurrDir(rpmts ts, const char * currDir);

/** \ingroup rpmts
 * Get transaction script file handle, i.e. stdout/stderr on scriptlet execution
 * @param ts		transaction set
 * @return		transaction script file handle
 */
FD_t rpmtsScriptFd(rpmts ts);

/** \ingroup rpmts
 * Set transaction script file handle, i.e. stdout/stderr on scriptlet execution
 * @param ts		transaction set
 * @param scriptFd	new script file handle (or NULL)
 */
void rpmtsSetScriptFd(rpmts ts, FD_t scriptFd);

/** \ingroup rpmts
 * Get selinuxEnabled flag, i.e. is SE linux enabled?
 * @param ts		transaction set
 * @return		selinuxEnabled flag
 */
int rpmtsSELinuxEnabled(rpmts ts);

/** \ingroup rpmts
 * Get chrootDone flag, i.e. has chroot(2) been performed?
 * @param ts		transaction set
 * @return		chrootDone flag
 */
int rpmtsChrootDone(rpmts ts);

/** \ingroup rpmts
 * Set chrootDone flag, i.e. has chroot(2) been performed?
 * @param ts		transaction set
 * @param chrootDone	new chrootDone flag
 * @return		previous chrootDone flag
 */
int rpmtsSetChrootDone(rpmts ts, int chrootDone);

/** \ingroup rpmts
 * Get transaction id, i.e. transaction time stamp.
 * @param ts		transaction set
 * @return		transaction id
 */
rpm_tid_t rpmtsGetTid(rpmts ts);

/** \ingroup rpmts
 * Set transaction id, i.e. transaction time stamp.
 * @param ts		transaction set
 * @param tid		new transaction id
 * @return		previous transaction id
 */
rpm_tid_t rpmtsSetTid(rpmts ts, rpm_tid_t tid);

/** \ingroup rpmts
 * Get transaction set database handle.
 * @param ts		transaction set
 * @return		transaction database handle
 */
rpmdb rpmtsGetRdb(rpmts ts);

/** \ingroup rpmts
 * Initialize disk space info for each and every mounted file systems.
 * @param ts		transaction set
 * @return		0 on success
 */
int rpmtsInitDSI(const rpmts ts);

/** \ingroup rpmts
 * Update disk space info for a file.
 * @param ts		transaction set
 * @param dev		mount point device
 * @param fileSize	long (64bit) file size
 * @param prevSize	previous long file size (if upgrading)
 * @param fixupSize	long size difference
 * @param action	file disposition
 */
void rpmtsUpdateDSI(const rpmts ts, dev_t dev,
		rpm_loff_t fileSize, rpm_loff_t prevSize, rpm_loff_t fixupSize,
		rpmFileAction action);

/** \ingroup rpmts
 * Check a transaction element for disk space problems.
 * @param ts		transaction set
 * @param te		current transaction element
 */
void rpmtsCheckDSIProblems(const rpmts ts, const rpmte te);

/** \ingroup rpmts
 * Perform transaction progress notify callback.
 * @param ts		transaction set
 * @param te		current transaction element
 * @param what		type of call back
 * @param amount	current value
 * @param total		final value
 * @return		callback dependent pointer
 */
void * rpmtsNotify(rpmts ts, rpmte te,
                rpmCallbackType what, rpm_loff_t amount, rpm_loff_t total);

/** \ingroup rpmts
 * Return number of (ordered) transaction set elements.
 * @param ts		transaction set
 * @return		no. of transaction set elements
 */
int rpmtsNElements(rpmts ts);

/** \ingroup rpmts
 * Return (ordered) transaction set element.
 * @param ts		transaction set
 * @param ix		transaction element index
 * @return		transaction element (or NULL)
 */
rpmte rpmtsElement(rpmts ts, int ix);

/** \ingroup rpmts
 * Get problem ignore bit mask, i.e. bits to filter encountered problems.
 * @param ts		transaction set
 * @return		ignore bit mask
 */
rpmprobFilterFlags rpmtsFilterFlags(rpmts ts);

/** \ingroup rpmts
 * Get transaction flags, i.e. bits that control rpmtsRun().
 * @param ts		transaction set
 * @return		transaction flags
 */
rpmtransFlags rpmtsFlags(rpmts ts);

/** \ingroup rpmts
 * Set transaction flags, i.e. bits that control rpmtsRun().
 * @param ts		transaction set
 * @param transFlags	new transaction flags
 * @return		previous transaction flags
 */
rpmtransFlags rpmtsSetFlags(rpmts ts, rpmtransFlags transFlags);

/** \ingroup rpmts
 * Get spec control structure from transaction set.
 * @param ts		transaction set
 * @return		spec control structure
 */
rpmSpec rpmtsSpec(rpmts ts);

/** \ingroup rpmts
 * Set a spec control structure in transaction set.
 * @param ts		transaction set
 * @param spec		new spec control structure
 * @return		previous spec control structure
 */
rpmSpec rpmtsSetSpec(rpmts ts, rpmSpec spec);

/** \ingroup rpmts
 * Retrieve color bits of transaction set.
 * @param ts		transaction set
 * @return		color bits
 */
rpm_color_t rpmtsColor(rpmts ts);

/** \ingroup rpmts
 * Retrieve prefered file color
 * @param ts		transaction set
 * @return		color bits
 */
rpm_color_t rpmtsPrefColor(rpmts ts);

/** \ingroup rpmts
 * Set color bits of transaction set.
 * @param ts		transaction set
 * @param color		new color bits
 * @return		previous color bits
 */
rpm_color_t rpmtsSetColor(rpmts ts, rpm_color_t color);

/** \ingroup rpmts
 * Retrieve operation timestamp from a transaction set.
 * @param ts		transaction set
 * @param opx		operation timestamp index
 * @return		pointer to operation timestamp.
 */
rpmop rpmtsOp(rpmts ts, rpmtsOpX opx);

/** \ingroup rpmts
 * Set transaction notify callback function and argument.
 *
 * @warning This call must be made before rpmtsRun() for
 *	install/upgrade/freshen to function correctly.
 *
 * @param ts		transaction set
 * @param notify	progress callback
 * @param notifyData	progress callback private data
 * @return		0 on success
 */
int rpmtsSetNotifyCallback(rpmts ts,
		rpmCallbackFunction notify,
		rpmCallbackData notifyData);

/** \ingroup rpmts
 * Create an empty transaction set.
 * @return		new transaction set
 */
rpmts rpmtsCreate(void);

/** \ingroup rpmts
 * Add package to be installed to transaction set.
 *
 * The transaction set is checked for duplicate package names.
 * If found, the package with the "newest" EVR will be replaced.
 *
 * @param ts		transaction set
 * @param h		header
 * @param key		package retrieval key (e.g. file name)
 * @param upgrade	is package being upgraded?
 * @param relocs	package file relocations
 * @return		0 on success, 1 on I/O error, 2 needs capabilities
 */
int rpmtsAddInstallElement(rpmts ts, Header h,
		const fnpyKey key, int upgrade,
		rpmRelocation * relocs);

/** \ingroup rpmts
 * Add package to be erased to transaction set.
 * @param ts		transaction set
 * @param h		header
 * @param dboffset	ununsed
 * @return		0 on success
 */
int rpmtsAddEraseElement(rpmts ts, Header h, int dboffset);

/** \ingroup rpmts
 * Retrieve keys from ordered transaction set.
 * @todo Removed packages have no keys, returned as interleaved NULL pointers.
 * @param ts		transaction set
 * @retval ep		address of returned element array pointer (or NULL)
 * @retval nep		address of no. of returned elements (or NULL)
 * @return		0 always
 */
int rpmtsGetKeys(rpmts ts,
		fnpyKey ** ep,
		int * nep);

#ifdef __cplusplus
}
#endif


#endif	/* H_RPMTS */
