/* Have courage and be kind*/
/* Mirrecale only happens to those who have the willpower to carry this forward*/
#include<bits/stdc++.h>
#include<stdlib.h>
#include <assert.h>  //assert ( n >= 1 && n < 100005 );
using namespace std;
#define inf 2147383647LL
#define SET(a) memset(a,-1,sizeof(a))
#define all(a) a.begin(),a.end()
#define CLR(a) memset(a,0,sizeof(a))
#define PB push_back
#define MP make_pair
#define pii pair<int,int>
#define FOR0(i,n) for(int i = 0;i<n;i++)
#define FOR1(i,n) for(int i = 1;i<=n;i++)
#define MIN(a,b) ((a)<(b)?(a):(b))
#define MAX(a,b) ((a)>(b)?(a):(b))
#define PI acos(-1.0)
#define EPS 1e-9
#define UNIQUE(V) (V).erase(unique((V).begin(),(V).end()),(V).end())//vector must be sorted
#define NUMDIGIT(x,y) (((int)(log10((x))/log10((y))))+1)
#define LCM(x,y) (((x)/gcd((x),(y)))*(y))
#define READ(f) freopen(f, "r", stdin)
#define WRITE(f) freopen(f, "w", stdout)
#define lol long long
#define ulol unsigned long long
#define pf printf
#define sf scanf
#define mod 1000000007 //10^9+7
#define pause system("pause")
#define F first
#define S second
#define phl printf ( "hello\n" )
#define POPCOUNT __builtin_popcountll
#define RIGHTMOST __builtin_ctzll
#define LEFTMOST(x) (63-__builtin_clzll((x)))

inline int read(){int x;scanf(" %d",&x);return x;}

/// Ferma't Little Theorem :  It stated that, if A and M are coprime and M is a prime, then, A^(M−1) = 1(mod M).
/// Modular Inverse((A^(-1))%M): When M is prime, we can find modular inverse by calculating the value of (A^(M−2))%M.

lol mod_v(lol num)
{
    if(num>=0)
      return(num%mod);
    else
     return(num%mod+mod)%mod;
}

lol bigmod ( lol b, lol p, lol m ) {  //Repeated Squaring Method for Modular Exponentiation
    lol res = 1 % m, x = b % m;
    while ( p ) {
        if ( p & 1 ) res = ( res * x ) % m;
        x = ( x * x ) % m;
        p >>= 1;
    }
    return res;
}

/********** Solution ***************/
#define NODE 10004

int mx_prefix[NODE];
int arr[NODE];
int dp[NODE][NODE];

int rec(int ind, int k, int n) {
    if(ind == n) {
        return 0;
    }

    if(k == 0) {
        return mx_prefix[ind];
    }

    if(dp[ind][k] != -1)
     return dp[ind][k];

    int ans = arr[ind] + rec(ind+1, k, n);
    if(arr[ind] < 0)
      ans = max(ans, rec(ind+1, k-1, n));

    return dp[ind][k] = ans;
}

int main()
{
    READ("input.txt");
    int test, k, ans, n;

    sf("%d", &test);
    cout<<test<<endl;

    FOR1(t, test) {
    phl;

        sf("%d %d", &n, &k);

        ans = -inf;

        FOR0(i, n) {
            sf("%d", &arr[i]);
            ans = max(ans, arr[i]);
        }

        for(int i=n-1; i>=0; i--) {
            if(i < n-1)
                mx_prefix[i] = mx_prefix[i+1] + arr[i];
            else
                mx_prefix[i] = arr[i];
            if(mx_prefix[i] < 0)
             mx_prefix[i] = 0;
        }

        SET(dp);
        phl;

        for(int i=0; i<n; i++) {
            ans = max(ans, rec(i, k, n));
        }

        pf("Case %d: %d\n", t, ans);
    }

}
